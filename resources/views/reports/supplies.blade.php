<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reporte de Suministros</title>
    <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        h1 { text-align: center; }
    </style>
</head>
<body>
    <h1>Reporte de Suministros</h1>
    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Stock Actual</th>
                <th>Unidad</th>
                <th>Stock Mínimo</th>
            </tr>
        </thead>
        <tbody>
            @foreach($supplies as $supply)
            <tr>
                <td>{{ $supply->name }}</td>
                <td>{{ $supply->type }}</td>
                <td>{{ $supply->stock_current }}</td>
                <td>{{ $supply->unit }}</td>
                <td>{{ $supply->min_stock }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>