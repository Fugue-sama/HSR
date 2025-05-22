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
        Schema::create('lightcores', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image');
            $table->text('effect');
            $table->text('subtile');
            $table->unsignedTinyInteger('rarity');
            $table->integer('hp');
            $table->integer('attack');
            $table->integer('defend');
            $table->string('roll');
            $table->text('desc');
            $table->foreignId('path_id')
            ->nullable()
            ->constrained('paths')
            ->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lightcores');
    }
};
