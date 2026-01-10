<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SuppliesExport implements FromCollection, WithHeadings
{
    protected $supplies;

    public function __construct(Collection $supplies)
    {
        $this->supplies = $supplies;
    }

    public function collection()
    {
        return $this->supplies->map(function ($supply) {
            return [
                'Nombre' => $supply->name,
                'Tipo' => $supply->type,
                'Stock Actual' => $supply->stock_current,
                'Unidad' => $supply->unit,
                'Stock Mínimo' => $supply->min_stock,
            ];
        });
    }

    public function headings(): array
    {
        return [
            'Nombre',
            'Tipo',
            'Stock Actual',
            'Unidad',
            'Stock Mínimo',
        ];
    }
}
