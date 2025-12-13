#!/usr/bin/env pwsh
# Script to verify README updates for Saha-UI components

$componentsToUpdate = @(
    'Resizable',
    'Segmented', 
    'Snackbar',
    'Sonner',
    'SpeedDial',
    'StatCard',
    'Stepper',
    'Tab',
    'Tag',
    'TextEditor',
    'ThemeProvider',
    'ThemeToggle',
    'Timeline',
    'Tour',
    'Transfer',
    'Tree',
    'NativeSelect'
)

$updated = 0
$remaining = 0

foreach ($component in $componentsToUpdate) {
    $readmePath = "src/components/$component/README.md"
    
    if (Test-Path $readmePath) {
        $content = Get-Content $readmePath -Raw
        
        if ($content -match '\[Component description will be added\]') {
            Write-Host "❌ $component - Still has placeholder" -ForegroundColor Yellow
            $remaining++
        } else {
            Write-Host "✅ $component - Updated" -ForegroundColor Green
            $updated++
        }
    } else {
        Write-Host "⚠️  $component - README not found" -ForegroundColor Red
    }
}

Write-Host "`n📊 Summary:" -ForegroundColor Cyan
Write-Host "   Updated: $updated" -ForegroundColor Green
Write-Host "   Remaining: $remaining" -ForegroundColor Yellow
Write-Host "   Total: $($componentsToUpdate.Count)" -ForegroundColor White
