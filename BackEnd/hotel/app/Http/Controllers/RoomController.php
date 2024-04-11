<?php

namespace App\Http\Controllers;

use App\Models\Facilities;
use App\Models\Room;
use App\Models\RoomFacilities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $limit = $request->query('limit', 4);

        $rooms = DB::table('room')
            ->select('room.*');
        $room_facilities = DB::table('facilities')
            ->join('room_facilities', 'facilities.id', '=', 'room_facilities.facilities_id')
            ->select('facilities.*', 'room_facilities.room_id AS room_id')
            ->get();
        // Lọc theo tên phòng
        $name = $request->query('name');
        if ($name) {
            $rooms = $rooms->where('room.name', 'LIKE', "%$name%");
        }

        // Lọc theo tầng
        $floor = $request->query('floor');
        if ($floor) {
            $rooms = $rooms->where('room.floor', $floor);
        }

        // Lọc theo loại phòng
        $type_room = $request->query('type_room');
        if ($type_room) {
            $rooms =  $rooms->where('room.type_room', $type_room);
        }

        // Lọc theo giá thuê
        $rent_cost = $request->query('rent_cost');
        if ($rent_cost) {
            if ($rent_cost === '500') {
                $rooms = $rooms->where('room.rent_cost', '<=', 500000);
            }
            if ($rent_cost === '500-1500') {

                $between = $this->exposeRentCost($rent_cost);

                $rooms = $rooms->whereBetween('room.rent_cost', $between);
            }
            if ($rent_cost === '1500-3000') {

                $between = $this->exposeRentCost($rent_cost);

                $rooms = $rooms->whereBetween('room.rent_cost', $between);
            }
            if ($rent_cost === '3000') {

                $rooms = $rooms->where('room.rent_cost', '>=', 3000000);
            }
        }


        // Lọc theo trạng thái
        $status = $request->query('status');
        if ($status) {
            $rooms =  $rooms->where('room.status', $status);
        }

        // Lọc theo số người tối đa
        $max_number_people = $request->query('max_number_people');
        if ($max_number_people) {
            $rooms =  $rooms->where('room.max_number_people', $max_number_people);
        }

        $rooms = $rooms->paginate($limit);

        return response()->json([
            'status' => 200,
            'rooms' => $rooms,
            'room_facilities' => $room_facilities
        ]);
    }
    public function exposeRentCost($rent_cost)
    {
        $rent_range = explode('-', $rent_cost);
        $min_rent = (int) $rent_range[0] . '000';
        $max_rent = (int) $rent_range[1] . '000';
        return [$min_rent, $max_rent];
    }

    public function getAllRoom()
    {
        $reservation = DB::table('room')
            ->join('reservation', 'reservation.room_id', '=', 'room.id')
            ->join('users', 'users.id', '=', 'reservation.user_id')
            ->select('users.name', 'users.image_path AS avatar', 'reservation.*')
            ->get();
        $rooms = DB::table('room')
            ->select('room.*')
            ->get();
        $room_facilities = DB::table('facilities')
            ->join('room_facilities', 'facilities.id', '=', 'room_facilities.facilities_id')
            ->select('facilities.*', 'room_facilities.room_id AS room_id')
            ->get();

        return response()->json([
            'status' => 200,
            'rooms' => $rooms,
            'room_facilities' => $room_facilities,
            'reservation' => $reservation
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'floor' => 'required|string|max:255',
            'type_room' => 'required|string|max:255',
            'max_number_people' => 'required|integer|min:1',
            'rent_cost' => 'required|numeric|min:0',
            'status' => 'required',
        ]);
        /* room */
        $room = new Room();
        $room->name = $validatedData['name'];
        $room->floor = $validatedData['floor'];
        $room->type_room = $validatedData['type_room'];
        $room->max_number_people = $validatedData['max_number_people'];
        $room->rent_cost = $validatedData['rent_cost'];
        $room->image = '';
        $room->image_path = '';
        $room->status = $validatedData['status'];
        $image = $request->image;
        if ($image) {
            $file = $request->image;
            $filename = 'image_room' . time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/images', $filename);
            $room->image = $filename;
            $room->image_path = '/storage/images/' . $filename;
        }

        if ($room->save()) {
            return response()->json([
                'status' => 200,
                'message' => 'Thêm phòng mới thành công'
            ]);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'Đã có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $room = Room::where('id', $id)->first();

        $room_facilities = DB::table('room_facilities')
            ->leftJoin('facilities', 'facilities.id', '=', 'room_facilities.facilities_id')
            ->where('room_facilities.room_id', $id)
            ->select('facilities.*', 'room_facilities.room_id AS room_id')
            ->get();
        return response()->json([
            'status' => 200,
            'detail_room' => $room,
            'room_facilities' => $room_facilities
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $room = Room::where('id', $id)->first();
        $room->name = $request->name;
        $room->floor = $request->floor;
        $room->type_room = $request->type_room;
        $room->max_number_people = $request->max_number_people;
        $room->rent_cost = $request->rent_cost;

        $old_image = $room->image;
        if ($request->image) {

            if (Storage::exists('public/images' . $old_image)) {
                Storage::delete('public/images' . $old_image);
            }
            $file = $request->image;
            $filename = 'image_room' . time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/images/' . $filename);
            $room->image = $filename;
            $room->image_path = '/storage/images/' . $filename;
        }
        $room->save();
        return response()->json([
            'status' => 200,
            'message' => 'Cập nhật phòng thành công'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $room = Room::where('id', $id)->first();
        $room_facilities = RoomFacilities::where('room_id', $id)->get();

        foreach ($room_facilities as $item) {
            $item->delete();
        }

        $old_image = $room->image;

        Storage::delete('public/images' . $old_image);
        $room->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Xóa phòng thành công'
        ]);
    }
}
