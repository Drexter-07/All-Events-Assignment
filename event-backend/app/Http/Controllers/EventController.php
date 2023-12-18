<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Carbon\Carbon;

class EventController extends Controller
{
    function addEvent(Request $req)
    {

        $event = new Event;
        $event->Name=$req->input('name');
        $event->Description=$req->input('description');
        $event->Location=$req->input('location');
        $event->Category=$req->input('category');

        $event->Start_Time = Carbon::parse($req->input('start'))->toDateString();
        $event->End_Time = Carbon::parse($req->input('end'))->toDateString();

        $event->fileName=$req->file('file')->store('events');
        $event->save();
        return $event;
    }
    function list(Request $req){
        $query = Event::query();

        if($req->has('category')){
            $query->where('Category', $req->input('category'));
        }

        if($req->has('location')){
            $query->where('Location', $req->input('location'));
        }

        if($req->has('start')){
            $startDate = Carbon::parse($req->input('start'))->toDateString();
            $query->whereDate('End_Time', '>=', $startDate);
        }

        if($req->has('end')){
            $endDate = Carbon::parse($req->input('end'))->toDateString();
            $query->whereDate('Start_Time', '<=', $endDate);
        }

        return $query->get();
    }
    
}
