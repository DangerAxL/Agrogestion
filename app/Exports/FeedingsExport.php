<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class FeedingsExport implements FromCollection, WithHeadings
{
    protected $feedings;

    protected $weightGains;

    public function __construct(Collection $feedings, array $weightGains)
    {
        $this->feedings = $feedings;
        $this->weightGains = $weightGains;
    }

    public function collection()
    {
        $data = $this->feedings->map(function ($feeding) {
            return [
                'Fecha' => $feeding->date->format('d/m/Y'),
                'Animal' => $feeding->animal->caravana ?? '',
                'Tipo de Alimentación' => $feeding->feed_type->name ?? '',
                'Cantidad' => $feeding->total_ration,
            ];
        });

        // Add weight gains summary
        $data->push([]);
        $data->push(['Resumen de Ganancias de Peso']);
        foreach ($this->weightGains as $feedType => $gains) {
            $data->push([
                'Tipo' => $feedType,
                'Ganancia Diaria' => number_format($gains['daily'], 2),
                'Ganancia Mensual' => number_format($gains['monthly'], 2),
                'Ganancia Semestral' => number_format($gains['semesterly'], 2),
            ]);
        }

        return $data;
    }

    public function headings(): array
    {
        return [
            'Fecha',
            'Animal',
            'Tipo de Alimentación',
            'Cantidad',
        ];
    }
}
