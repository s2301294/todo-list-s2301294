{ pkgs ? import <nixpkgs> {} }:

let
  androidPkgs = pkgs.androidenv.composeAndroidPackages {
    cmdLineToolsVersion = "19.0";
    platformToolsVersion = "36.0.0";
    platformVersions = [ "34" "36" ];
    buildToolsVersions = [ "34.0.0" "35.0.0" "36.0.0" ];
    includeNDK = true;
    ndkVersion = "27.1.12297006";
    includeEmulator = false;
    includeSystemImages = false;
    includeSources = true;
    includeCmake = true;
    cmakeVersions = [ "3.22.1" ];
    abiVersions = [ "arm64-v8a" ];
  };

  phoneIp = "192.168.1.142";  
in
pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_24
    yarn-berry
    corepack
    watchman
    git
    curl
    wget
    unzip
    coreutils

    openjdk17
    cmake
    ninja
    pkg-config
    androidPkgs.androidsdk
    androidPkgs.platform-tools
    androidPkgs.ndk-bundle

    gtk3
    webkitgtk_6_0
    cairo
    pango
    glib
    dbus
    gobject-introspection
  ];

  ANDROID_HOME = "${androidPkgs.androidsdk}/libexec/android-sdk";
  ANDROID_SDK_ROOT = "${androidPkgs.androidsdk}/libexec/android-sdk";
  ANDROID_NDK_HOME = "${androidPkgs.ndk-bundle}/libexec/android-sdk/ndk/27.1.12297006";
  JAVA_HOME = pkgs.openjdk17;

  shellHook = ''
    unset SOURCE_DATE_EPOCH

    export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_NDK_HOME

    echo "
    ---------------------------------------------------
    TerminallyIll Dev Shell Ready!
    Node:               $(node -v)
    Yarn:               $(yarn -v)
    Corepack Yarn:      $(corepack yarn -v)
    Java:               $(java -version 2>&1 | head -n1)
    Platform:           Android 14 + 16 (API 34 + 36)
    SDK:                $ANDROID_SDK_ROOT
    NDK:                $ANDROID_NDK_HOME
    ---------------------------------------------------
    "

    if command -v adb >/dev/null 2>&1; then
      connected_devices=$(adb devices | grep -v 'List' | grep -v '^$' | awk '{print $1}')

      if [ -n "$connected_devices" ]; then
        echo "✅ Existing ADB device(s) already connected:"
        echo "$connected_devices"
      else
        echo "→ No device detected. Trying to connect to ${phoneIp}..."
        adb start-server >/dev/null 2>&1
        adb connect ${phoneIp}:5555 >/dev/null 2>&1 && \
          echo "✅ Connected to ${phoneIp}" || \
          echo "⚠️  Could not connect to ${phoneIp}. Ensure phone is on same LAN and wireless debugging is enabled."
      fi
    else
      echo "⚠️  adb not found in PATH."
    fi
  '';
}
