# ---------------------------------------------------------------------------
# purge-foreign.ps1 — removes files injected by unrelated projects.
#
# The workspace folder is shared with an external process that writes
# Next.js / Supabase / LiveKit ("Cowork" demo) files into this directory.
# Owner-approved: purge those files so the FLORENCES build stays green.
# It never touches `_hr_out.txt`, `AGENTS.md`, `docs/`, or any file of the
# wedding-invitation platform (detected by foreign import markers).
# ---------------------------------------------------------------------------

$ErrorActionPreference = 'SilentlyContinue'
$root = Split-Path -Parent $PSScriptRoot
$removed = @()

# Known foreign paths (relative to project root)
$known = @(
  'next.config.ts'
  'next-env.d.ts'
  'vitest.config.ts'
  '.env.example'
  'middleware.ts'
  'postcss.config.mjs'
  'tailwind.config.ts'
  'src\proxy.ts'
  'src\app\layout.tsx'
  'src\app\page.tsx'
  'src\app\globals.css'
  'src\app\(auth)'
  'src\app\auth'
  'src\components\auth'
  'src\types'
  'src\lib'
  'src\components\ui\button.tsx'
  'src\components\ui\input.tsx'
  'src\components\ui\label.tsx'
  'src\components\ui\brand.tsx'
  'src\components\ui\notice.tsx'
  'src\components\discovery'
  'src\components\dashboard'
  'src\components\onboarding'
  'src\components\profile'
  'src\components\settings'
  'src\components\members'
  'src\hooks'
)

foreach ($rel in $known) {
  $path = Join-Path $root $rel
  if (Test-Path -LiteralPath $path) {
    Remove-Item -Recurse -Force -LiteralPath $path
    $removed += $rel
  }
}

# Content scan: source files importing foreign packages are foreign.
$markers = 'from ["'']next(/|[''"])|from ["'']@supabase/|from ["'']server-only|from ["'']livekit|NEXT_PUBLIC_'

$srcDir = Join-Path $root 'src'
if (Test-Path -LiteralPath $srcDir) {
  Get-ChildItem -Recurse -File -LiteralPath $srcDir -Include *.ts, *.tsx, *.css |
    ForEach-Object {
      $content = Get-Content -Raw -LiteralPath $_.FullName
      if ($content -and $content -match $markers) {
        $rel = $_.FullName.Substring($root.Length + 1)
        Remove-Item -Force -LiteralPath $_.FullName
        $removed += $rel
      }
    }
}

# Remove directories left empty after file removal (only inside src)
Get-ChildItem -Recurse -Directory -LiteralPath $srcDir -ErrorAction SilentlyContinue |
  Where-Object { -not (Get-ChildItem -File -Recurse -LiteralPath $_.FullName) } |
  ForEach-Object {
    Remove-Item -Recurse -Force -LiteralPath $_.FullName
    $removed += $_.FullName.Substring($root.Length + 1)
  }

# Package manifest: drop injected backend/framework dependencies that this
# client-only MVP must not carry (owner-approved purge). Handled by the
# Node helper so package.json keeps npm-style formatting.
$pruneScript = Join-Path $root 'scripts\prune-package-deps.mjs'
if (Test-Path -LiteralPath $pruneScript) {
  $pruneOutput = & node $pruneScript 2>&1
  if ($LASTEXITCODE -eq 0 -and $pruneOutput) {
    $removed += @($pruneOutput | ForEach-Object { "$_" })
  }
}

if ($removed.Count -eq 0) {
  Write-Output "purge-foreign: clean (nothing to remove)"
} else {
  Write-Output "purge-foreign: removed $($removed.Count) foreign item(s):"
  $removed | ForEach-Object { Write-Output "  - $_" }
}
exit 0
