<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reporte de Animales</title>
    <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        h1 { text-align: center; }
    </style>
</head>
<body>
    <h1>Reporte de Animales</h1>
    <table>
        <thead>
            <tr>
                <th>Caravana</th>
                <th>Raza</th>
                <th>Lote</th>
                <th>Peso Entrada</th>
                <th>Peso Actual</th>
                <th>Estado</th>
                <th>Activo</th>
                <th>Fecha Entrada</th>
                <th>Fecha Retiro</th>
            </tr>
        </thead>
        <tbody>
            @foreach($animals as $animal)
            <tr>
                <td>{{ $animal->caravana }}</td>
                <td>{{ $animal->breed->name ?? '' }}</td>
                <td>{{ $animal->lot->name ?? '' }}</td>
                <td>{{ $animal->weight_entry }}</td>
                <td>{{ $animal->weight_current }}</td>
                <td>{{ $animal->status }}</td>
                <td>{{ $animal->active ? 'Sí' : 'No' }}</td>
                <td>{{ $animal->entry_date?->format('d/m/Y') }}</td>
                <td>{{ $animal->withdrawal_date?->format('d/m/Y') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>