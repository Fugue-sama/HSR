<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Session;
use Symfony\Component\HttpFoundation\Response;

class StorePreviousUrl
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if (
            !$request->expectsJson() &&
            $request->method() === 'GET' &&
            !Session::has('url.intended') &&
            !in_array($request->path(), ['login', 'register']) &&
            !str_contains($request->path(), 'auth/google')
        ) {
            $request->session()->put('url.intended', url()->full());
        }

        return $next($request);
    }
}
