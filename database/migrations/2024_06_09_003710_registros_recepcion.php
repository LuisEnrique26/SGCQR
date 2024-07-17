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
        Schema::create('registros_recepcion', function (Blueprint $table) {
            $table -> bigIncrements('id');
            $table -> string('carga', 30);
            $table -> string('zona', 30);
            $table -> string('dama', 30);
            $table -> string('pedido', 30);
            $table -> string('caja', 30);
            $table -> timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registros_recepcion');
    }
};
