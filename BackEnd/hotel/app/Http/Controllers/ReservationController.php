<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Bắt đầu câu truy vấn
        $query = DB::table('reservation')
            ->join('users', 'users.id', '=', 'reservation.user_id')
            ->join('room', 'room.id', '=', 'reservation.room_id')
            ->select('users.email', 'room.floor', 'room.type_room', 'room.name AS room_name', 'room.max_number_people', 'room.rent_cost', 'reservation.*');

        $user_name = $request->query('user_name');
        if ($user_name) {
            $query->where('reservation.fullname', 'LIKE', '%' . $user_name . '%');
        }

        $room_name = $request->query('room_name');
        if ($room_name) {
            $query->where('room.name', 'LIKE', '%' . $room_name . '%');
        }


        $start_from = $request->query('start_from');
        if ($start_from) {
            $query->where('reservation.start_from', '=', $start_from);
        }


        $end_at = $request->query('end_at');
        if ($end_at) {
            $query->where('reservation.end_at', '=', $end_at);
        }


        $status = $request->query('status');
        if ($status) {
            $query->where('reservation.status', '=', $status);
        }

        $limit = $request->query('limit', 2);
        $reservation = $query->paginate($limit);

        return response()->json([
            'status' => 200,
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

        /* $existingReservation = Reservation::where('user_id', $request->user_id)
            ->where('room_id', $request->room_id)
            ->first();

        if ($existingReservation) {
            return response()->json(['message' => 'Bạn đã đặt phòng này, vui lòng kiểm tra lại', 'status'=>400]);
        } */


        $reservation = new Reservation();
        $reservation->room_id = $request->room_id;
        $reservation->user_id = $request->user_id;
        $reservation->fullname = $request->fullname;
        $reservation->number = $request->number;
        $reservation->start_from = $request->start_from;
        $reservation->end_at = $request->end_at;
        $reservation->adult = $request->adult;
        $reservation->children = $request->children;
        $reservation->note = $request->has('note') ? $request->note : '';
        $reservation->status = '5';
        $reservation->save();

        return response()->json(['message' => 'Đặt phòng thành công', 'status'=>200],);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $query = DB::table('reservation')
            ->join('users', 'users.id', '=', 'reservation.user_id')
            ->join('room', 'room.id', '=', 'reservation.room_id')
            ->where('reservation.user_id', '=', $id)
            ->select('users.email', 'room.floor', 'room.type_room', 'room.name AS room_name', 'room.max_number_people', 'room.rent_cost', 'reservation.*');
        $reservation = $query->paginate(2);

        return response()->json([
            'status' => 200,
            'reservation' => $reservation
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $reservation = Reservation::where('id', $id)->first();
        $status = $request->status;
        if (!$status) {
            return response()->json([
                'status' => 404,
            ]);
        }
        /* if($status === '1' || $status === '2' || $status === '4'){
            $reservation->delete();
        } */
        $reservation->status = $status;
        $reservation->save();
        return response()->json([
            'status' => 200,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Xóa đơn đặt phòng thành công'
        ]);
    }
}
