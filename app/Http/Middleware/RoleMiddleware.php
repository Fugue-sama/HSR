<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    // Nhận request: Nó nhận đối tượng $request chứa thông tin về yêu cầu từ người dùng.
    // Chuyển giao request: Nó gọi $next($request), chuyển quyền xử lý request đến middleware tiếp theo hoặc controller.
    // Nhận response: $next($request) trả về đối tượng $response sau khi các middleware tiếp theo và controller đã xử lý xong.
    // Trả về response: Middleware này trả về trực tiếp đối tượng $response mà nó nhận được.
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if(!auth()->check()) abort(403, 'Unauthorized');

        $userRole = auth()->user()->role;

        // kiem tra co phai vai tro admin khong
        foreach ($roles as $role) {
            if (
                $userRole === $role || // chính xác
                str_starts_with($userRole, $role . '.') // vai trò con
            ) {
                return $next($request);
            }
        }
        abort(403, 'Unauthorized');

    }
}
