<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use App\Models\Report;

class NewReportNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $report;

    public function __construct(Report $report)
    {
        $this->report = $report;
    }

    // Chỉ gửi notification qua database (ko gửi mail)
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    // Không cần toMail vì ko gửi mail

    // Dữ liệu lưu vào database notification
    public function toArray(object $notifiable): array
    {
        return [
            'report_id' => $this->report->id,
            'comment_id' => $this->report->comment_id,
            'user_id' => $this->report->user_id,
            'reason' => $this->report->reason,
            'type' => 'report_comment',
        ];
    }
}
