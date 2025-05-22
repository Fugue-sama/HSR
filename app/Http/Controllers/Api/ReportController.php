<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\User;
use App\Notifications\NewReportNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ReportController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'comment_id' => 'required|exists:comments,id',
            'reason' => 'nullable|string|max:255',
        ]);
    
        $userId = Auth::id();
        $commentId = $request->comment_id;
    
        $existingReport = Report::where('user_id', $userId)
            ->where('comment_id', $commentId)
            ->first();
        
            if ($existingReport) {
                return response()->json([
                    'message' => 'duplicate',
                ], 200); 
            }
    
        Report::create([
            'comment_id' => $commentId,
            'user_id' => $userId,
            'reason' => $request->reason,
        ]);
    
        return response()->json([
            'message' => 'Báo cáo thành công.'
        ], 200);
    }
    
     public function index()
     {
         $reports = Report::with('comment', 'user')->latest()->get();
        
         return response()->json($reports);
     }
     public function destroy($id)
     {
         $report = Report::find($id);
         if (!$report) {
             return response()->json(['message' => 'Báo cáo không tồn tại'], 404);
         }
         $report->delete();
     
         return response()->json(['message' => 'Xóa báo cáo thành công'], 200);
     }

     public function unreadReports()
    {
        $unreadReports = Report::with('comment', 'user')
            ->where('is_read', false)
            ->latest()
            ->get();

        return response()->json($unreadReports);
    }
    public function markAsRead($id)
    {
        $report = Report::findOrFail($id);
        $report->is_read = true;
        $report->save();

        return response()->json(['message' => 'Đã đánh dấu đã đọc']);
    }

}
