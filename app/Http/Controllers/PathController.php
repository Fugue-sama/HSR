<?php

namespace App\Http\Controllers;

use App\Models\Path;
use Illuminate\Http\Request;

class PathController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paths = Path::all();
        
        if (auth()->user()?->role && str_starts_with(auth()->user()->role, 'admin')) {
            return inertia('PathsAdmin', ['paths' => $paths]);
        }
        return inertia('Paths', ['paths'=> $paths]);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Path $path)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Path $path)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Path $path)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Path $path)
    {
        //
    }
}
