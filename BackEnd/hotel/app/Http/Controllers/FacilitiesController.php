<?php

namespace App\Http\Controllers;

use App\Models\Facilities;
use App\Models\RoomFacilities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FacilitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $facilitiess = Facilities::query();
        $name = $request->query('name');
        if (isset($name)) {
            $facilities = $facilitiess->where('name', 'like', '%' . $name . '%');
        }
        $limit = $request->query('limit', 5); // Giới hạn mặc định là 5 nếu không có giới hạn được truyền vào
        $facilities = $facilitiess->paginate($limit);
        return response()->json([
            'status' => 200,
            'facilities' => $facilities
        ]);
    }

    public function getAllFacilities()
    {
        $facilitiess = Facilities::all();
        return response()->json([
            'status' => 200,
            'facilities' => $facilitiess
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'icon' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $old_facilities = Facilities::all();

        if ($old_facilities->isNotEmpty()) {
            $name = $request->name;

            foreach ($old_facilities as $facility) {
                $old_name = $facility->name;

                if ($name === $old_name) {
                    return response()->json([
                        'status' => 400,
                        'message' => 'Cơ sở vật chất này đã có, vui lòng thử lại'
                    ]);
                }
            }
        }
        $facilities = new Facilities();
        $facilities->name = $request->name;
        $facilities->icon = $request->icon;
        $facilities->save();

        return response()->json([
            'status' => 200,
            'message' => 'Thêm mới cơ sở vật chất thành công'
        ]);
    }

    public function storeRoomFacilities(Request $request, $id)
    {
        $old_room_facilities = RoomFacilities::all();
        $facilities_id = $request->facilities_id;
        foreach ($old_room_facilities as $item) {
            if ($item->room_id == $id && $item->facilities_id == $facilities_id) {
                return response()->json([
                    'status' => 400,
                    'message' => 'Tiện nghi cho phòng đã tồn tại'
                ]);
            }
        }

        $room_facilities = new RoomFacilities();
        $room_facilities->room_id = $id;
        $room_facilities->facilities_id = $facilities_id;
        $room_facilities->save();
        return response()->json([
            'status' => 200,
            'message' => 'Thêm tiện nghi cho phòng thành công'
        ]);
    }



    public function update(Request $request, string $id)
    {
        $facilities = Facilities::where('id', $id)->first();
        $facilities->name = $request->name;
        $facilities->icon = $request->icon;
        $facilities->save();
        return response()->json([
            'status' => 200,
            'message' => 'Cập nhật cơ sở vật chất thành công'
        ]);
    }


    public function destroy(string $id)
    {
        $facilities = Facilities::where('id', $id)->first();
        $facilities->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Xóa cơ sở vật chất thành công'
        ]);
    }
    public function destroyRoomFacilities(string $id)
    {
        $room_facilities = RoomFacilities::where('id', $id);
        $room_facilities->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Xóa cơ sở vật chất khỏi phòng thành công'
        ]);
    }
}
