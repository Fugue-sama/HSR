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
        Schema::create('characters', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('image');
            $table->text('background');
            $table->text('faction');
            $table->text('gameplay');
            $table->unsignedTinyInteger('rarity');

            $table->text('desc')->nullable();

            $table->json('stats')->nullable();
            $table->json('souls')->nullable();
            $table->json('skills')->nullable();;

            $table->foreignId('element_id')
                  ->nullable()
                  ->constrained('elements')
                  ->nullOnDelete();

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
        Schema::dropIfExists('characters');
    }
};
