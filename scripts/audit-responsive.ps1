# Phase 7 static responsive audit: flag fixed widths that could overflow
# a 375px viewport. Not a pass/fail gate — a list to eyeball.
$root = Split-Path -Parent $PSScriptRoot
$cssFiles = Get-ChildItem -Recurse -Filter *.css -LiteralPath (Join-Path $root 'src')

Write-Output "=== Fixed px element widths > 340 (check for 375px overflow) ==="
foreach ($f in $cssFiles) {
  $lines = Get-Content -LiteralPath $f.FullName
  for ($i = 0; $i -lt $lines.Count; $i++) {
    # Only real declarations: "width: 480px;" — not @media (max-width: 640px).
    if ($lines[$i] -match '^\s*(min-|max-)?width:\s*(\d{3,})px\s*;') {
      if ([int]$matches[2] -gt 340) {
        $rel = $f.FullName.Substring($root.Length + 1)
        Write-Output ("{0}:{1}  {2}" -f $rel, ($i + 1), $lines[$i].Trim())
      }
    }
  }
}

Write-Output ""
Write-Output "=== min-width declarations ==="
foreach ($f in $cssFiles) {
  $lines = Get-Content -LiteralPath $f.FullName
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'min-width:\s*\d{3,}px') {
      $rel = $f.FullName.Substring($root.Length + 1)
      Write-Output ("{0}:{1}  {2}" -f $rel, ($i + 1), $lines[$i].Trim())
    }
  }
}

Write-Output ""
Write-Output "=== overflow: hidden on scroll containers (clip risk) ==="
foreach ($f in $cssFiles) {
  $lines = Get-Content -LiteralPath $f.FullName
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'overflow(-x)?:\s*(hidden|clip)') {
      $rel = $f.FullName.Substring($root.Length + 1)
      Write-Output ("{0}:{1}  {2}" -f $rel, ($i + 1), $lines[$i].Trim())
    }
  }
}
