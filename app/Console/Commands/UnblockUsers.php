<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class UnblockUsers extends Command
{
    protected $signature = 'app:unblock-users';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Tự động mở khóa tài khoản bị khóa sau 7 ngày';


    /**
     * Execute the console command.
     */

    public function handle()
    {
        DB::table('users')
            ->where('is_blocked', 1)
            ->where('updated_at', '<=', now()->subDays(7))
            ->update([
                'is_blocked' => 0,
                'updated_at' => now(),
            ]);

        $this->info('Unblocked users who were blocked more than 7 days ago.');
    }
}
