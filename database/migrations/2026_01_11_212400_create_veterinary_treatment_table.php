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
        Schema::create('veterinary_treatments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('treatment_catalog_id')->constrained()->onDelete('cascade');
            $table->foreignId('animal_id')->constrained()->onDelete('cascade');
            $table->date('applied_at');
            $table->string('dosage')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('veterinary_treatments');
    }
};
