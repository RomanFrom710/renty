# renty

Use `yarn` to install everything.

## Windows notes

`mongodb-memory-server` (used for testing) package may not work because of lacking OpenSSL library. If you have troubles with it:

1. Download the latest version for your platform [here](https://indy.fulgan.com/SSL/)

2. Run

```batch
copy ssleay32.dll %WINDIR%\System32\ssleay32.dll
copy libeay32.dll %WINDIR%\System32\libeay32.dll
regsvr32.exe /s %WINDIR%\System32\ssleay32.dll
regsvr32.exe /s %WINDIR%\System32\libeay32.dll
```
