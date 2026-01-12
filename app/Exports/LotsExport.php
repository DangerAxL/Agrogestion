<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class LotsExport implements FromCollection, WithHeadings
{
    protected $lotsStats;

    public function __construct(Collection $lotsStats)
    {
        $this->lotsStats = $lotsStats;
    }

    public function collection()
    {
        return $this->lotsStats->map(function ($lot) {
            return [
                'Nombre' => $lot['name'],
                'Total Animales' => $lot['total_animals'],
                'Animales Activos' => $lot['active_animals'],
                'Animales Inactivos' => $lot['inactive_animals'],
                'Peso Promedio' => $lot['average_weight'],
            ];
        });
    }

    public function headings(): array
    {
        return [
            'Nombre',
            'Total Animales',
            'Animales Activos',
            'Animales Inactivos',
            'Peso Promedio',
        ];
    }
}
