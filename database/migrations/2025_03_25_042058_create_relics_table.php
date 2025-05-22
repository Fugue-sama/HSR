<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('relics', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image');
            $table->text(column: 'set_two');
            $table->text(column: 'set_four');
            $table->json(column: 'suit');
            $table->json('type');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('relics');
    }
};
