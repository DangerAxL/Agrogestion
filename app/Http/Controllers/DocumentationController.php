<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DocumentationController extends Controller
{
    /**
     * Display a listing of documents.
     */
    public function index()
    {
        $files = Storage::files('documents');
        $documents = collect($files)->map(function ($file) {
            return [
                'name' => basename($file),
                'path' => $file,
                'size' => Storage::size($file),
                'last_modified' => Storage::lastModified($file),
            ];
        });

        return Inertia::render('livestock/Documentation/Index', [
            'documents' => $documents,
        ]);
    }

    /**
     * Show the form for uploading a new document.
     */
    public function create()
    {
        return Inertia::render('livestock/Documentation/Create');
    }

    /**
     * Store a newly uploaded document.
     */
    public function store(Request $request)
    {
        $request->validate([
            'document' => 'required|file|mimes:pdf,doc,docx,txt|max:10240', // 10MB
        ]);

        $file = $request->file('document');
        $path = $file->store('documents');

        return redirect()->route('documentation.index')->with('success', __('Document uploaded successfully.'));
    }

    /**
     * Download the specified document.
     */
    public function show(string $filename)
    {
        $path = 'documents/'.$filename;

        if (! Storage::exists($path)) {
            abort(404);
        }

        return Storage::download($path);
    }

    /**
     * Remove the specified document.
     */
    public function destroy(string $filename)
    {
        $path = 'documents/'.$filename;

        if (! Storage::exists($path)) {
            abort(404);
        }

        Storage::delete($path);

        return redirect()->route('documentation.index')->with('success', __('Document deleted successfully.'));
    }
}
