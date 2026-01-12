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
        Schema::create('health_alerts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('animal_id')->constrained('animals')->onDelete('cascade');
            $table->string('type', 100);
            $table->text('message');
            $table->date('alert_date');
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->boolean('resolved')->default(false);
            $table->timestamp('resolved_at')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('health_alerts');
    }
};
