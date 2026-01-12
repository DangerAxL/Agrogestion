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
        Schema::create('animals', function (Blueprint $table) {
            $table->id();
            $table->string('caravana', 20)->unique();
            $table->foreignId('breed_id')->nullable()->constrained('breeds')->nullOnDelete();
            $table->decimal('weight_entry', 10, 2);
            $table->decimal('weight_current', 10, 2);
            $table->string('status', 50);
            $table->foreignId('lot_id')->nullable()->constrained('lots')->nullOnDelete();
            $table->boolean('active')->default(true);
            $table->date('entry_date');
            $table->date('withdrawal_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};
