<?php

namespace App\Http\Controllers;

use App\Models\Element;
use Illuminate\Http\Request;

class ElementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $elements = Element::all();
    
        return inertia('Elements', ['elements' => $elements]);
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
    public function show(Element $element)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Element $element)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Element $element)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Element $element)
    {
        //
    }
}
