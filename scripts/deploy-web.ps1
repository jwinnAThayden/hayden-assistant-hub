param(
  [string]$RemoteHost = "hbccloudweb1.haydenbeverage.com",
  [string]$RemoteUser = "www-data",
  [Parameter(Mandatory = $true)]
  [string]$RemotePath,
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

function Quote-RemotePath {
  param([string]$Path)
  return "'" + $Path.Replace("'", "'""'""'") + "'"
}

if (-not (Get-Command ssh -ErrorAction SilentlyContinue)) {
  throw "ssh was not found on PATH. Install or enable OpenSSH Client on this Windows device."
}

if (-not (Get-Command scp -ErrorAction SilentlyContinue)) {
  throw "scp was not found on PATH. Install or enable OpenSSH Client on this Windows device."
}

if (-not $SkipBuild) {
  npm run typecheck
  npm run build:web
}

if (-not (Test-Path -Path "dist\index.html" -PathType Leaf)) {
  throw "dist\index.html was not found. Run npm run build:web before deploying."
}

$target = "$RemoteUser@$RemoteHost"
$quotedRemotePath = Quote-RemotePath -Path $RemotePath

ssh $target "mkdir -p $quotedRemotePath"
scp -r "dist/." "${target}:$RemotePath/"
ssh $target "find $quotedRemotePath -type d -exec chmod 0755 {} \; && find $quotedRemotePath -type f -exec chmod 0644 {} \;"

Write-Host "Deployed dist/ to $target`:$RemotePath"
Write-Host "Make sure the web server serves that directory over HTTPS."
