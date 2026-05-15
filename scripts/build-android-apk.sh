#!/opt/homebrew/bin/bash

# --- KONFIGURACJA ---
APP_NAME="TwojaApka"
BUILD_TYPE="debug" # Zmień na 'release' dla wersji produkcyjnej
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🚀 ROZPOCZYNAM PROCES BUDOWANIA APK (Pipeline Style)"
echo "----------------------------------------------------"

# KROK 1: Środowisko i Zależności
echo "Step 1/5: 📦 Instalacja zależności..."
cd ..
npm install --legacy-peer-deps || { echo "❌ Błąd: npm install nie powiodło się"; exit 1; }

# KROK 2: Czyszczenie poprzednich buildów
echo "Step 2/5: 🧹 Czyszczenie starych plików..."
rm -rf android
rm -rf ios
rm -rf .expo
echo "✅ Katalogi wyczyszczone."

# KROK 3: Expo Prebuild (Generowanie plików natywnych)
echo "Step 3/5: 🛠️ Generowanie struktury natywnej Androida..."
npx expo prebuild --platform android --no-install || { echo "❌ Błąd: Prebuild nie powiódł się"; exit 1; }

# KROK 4: Kompilacja Gradle (Główny proces budowania)
echo "Step 4/5: 🏗️ Uruchamianie kompilacji Gradle..."
cd android

# Używamy flagi --no-daemon, aby skrypt zachowywał się jak w pipeline CI
if [ "$BUILD_TYPE" = "debug" ]; then
    ./gradlew assembleDebug --no-daemon || { echo "❌ Błąd: Gradle build nie powiódł się"; exit 1; }
    APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
else
    ./gradlew assembleRelease --no-daemon || { echo "❌ Błąd: Gradle build nie powiódł się"; exit 1; }
    APK_PATH="app/build/outputs/apk/release/app-release.apk"
fi

cd ..

# KROK 5: Finalizacja i przeniesienie pliku
echo "Step 5/5: 📂 Finalizacja i eksport pliku..."
mkdir -p builds
FINAL_APK_NAME="builds/${APP_NAME}_${TIMESTAMP}.apk"

if [ -f "android/$APK_PATH" ]; then
    cp "android/$APK_PATH" "$FINAL_APK_NAME"
    echo "----------------------------------------------------"
    echo "✅ SUKCES!"
    echo "📍 Twój plik APK znajduje się tutaj: $FINAL_APK_NAME"
else
    echo "❌ Błąd: Nie odnaleziono wygenerowanego pliku APK."
    exit 1
fi