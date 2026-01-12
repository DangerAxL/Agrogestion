<?php

/*
 * Configuración de Pest para el proyecto Feedlot.
 * Extiende TestCase para tests de Feature, que incluye RefreshDatabase.
 * Los tests de Unit usan PHPUnit\Framework\TestCase por defecto.
 */
pest()->extend(Tests\TestCase::class)->in('Feature');
