<?php

namespace App\Http\Controllers;

use App\Exports\AnimalsExport;
use App\Exports\SuppliesExport;
use App\Models\Animal;
use App\Models\Feeding;
use App\Models\HealthRecord;
use App\Models\Lot;
use App\Models\Supply;
use App\Models\Weighing;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    /**
     * Display a listing of available reports.
     */
    public function index()
    {
        return Inertia::render('livestock/Reports/Index');
    }

    /**
     * Generate and display animal inventory report.
     */
    public function animals(Request $request)
    {
        $query = Animal::with(['lot', 'breed']);

        if ($request->has('lot_id') && $request->lot_id && $request->lot_id !== 'all') {
            $query->where('lot_id', $request->lot_id);
        }

        $animals = $query->get();

        $lots = Lot::all();

        if ($request->has('export') && $request->export === 'pdf') {
            $pdf = Pdf::loadView('reports.animals', compact('animals'));

            return $pdf->download('animals_report.pdf');
        }

        if ($request->has('export') && $request->export === 'excel') {
            return Excel::download(new AnimalsExport($animals), 'animals_report.xlsx');
        }

        return Inertia::render('livestock/Reports/Animals', [
            'animals' => $animals,
            'lots' => $lots,
            'filters' => $request->only(['lot_id']),
        ]);
    }

    /**
     * Generate and display weighing report.
     */
    public function weighings(Request $request)
    {
        $query = Weighing::with(['animal.lot']);

        if ($request->has('animal_id') && $request->animal_id) {
            $query->where('animal_id', $request->animal_id);
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->where('date', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->where('date', '<=', $request->date_to);
        }

        $weighings = $query->orderBy('date')->get();

        $animals = Animal::all();

        return Inertia::render('livestock/Reports/Weighings', [
            'weighings' => $weighings,
            'animals' => $animals,
            'filters' => $request->only(['animal_id', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Generate and display feeding report.
     */
    public function feedings(Request $request)
    {
        $query = Feeding::with(['animal', 'feed_type']);

        if ($request->has('animal_id') && $request->animal_id && $request->animal_id !== 'all') {
            $query->where('animal_id', $request->animal_id);
        }

        if ($request->has('feed_type_id') && $request->feed_type_id && $request->feed_type_id !== 'all') {
            $query->where('feed_type_id', $request->feed_type_id);
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->where('date', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->where('date', '<=', $request->date_to);
        }

        $feedings = $query->orderBy('date')->get();

        $animals = Animal::all();
        $feed_types = \App\Models\FeedType::all();

        return Inertia::render('livestock/Reports/Feedings', [
            'feedings' => $feedings,
            'animals' => $animals,
            'feed_types' => $feed_types,
            'filters' => $request->only(['animal_id', 'feed_type_id', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Generate and display health report.
     */
    public function health(Request $request)
    {
        $query = HealthRecord::with(['animal.lot']);

        if ($request->has('animal_id') && $request->animal_id && $request->animal_id !== 'all') {
            $query->where('animal_id', $request->animal_id);
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->where('date', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->where('date', '<=', $request->date_to);
        }

        $healthRecords = $query->orderBy('date')->get();

        $animals = Animal::all();

        return Inertia::render('livestock/Reports/Health', [
            'health_records' => $healthRecords,
            'animals' => $animals,
            'filters' => $request->only(['animal_id', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Generate and display supply inventory report.
     */
    public function supplies(Request $request)
    {
        $supplies = Supply::all();

        if ($request->has('export') && $request->export === 'pdf') {
            $pdf = Pdf::loadView('reports.supplies', compact('supplies'));

            return $pdf->download('supplies_report.pdf');
        }

        if ($request->has('export') && $request->export === 'excel') {
            return Excel::download(new SuppliesExport($supplies), 'supplies_report.xlsx');
        }

        return Inertia::render('livestock/Reports/Supplies', [
            'supplies' => $supplies,
        ]);
    }
}
