<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user()->tokens) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        } else {
            if ($request->user() && $request->user()->tokens) {
                $token = $request->user()->tokens->firstWhere('name', '_AdminToken');
                if (!$token || !$token->can('_AdminToken')) {
                    return response()->json(['error' => 'Unauthorized'], 401);
                }
            }
        }

        return $next($request);
    }
}

