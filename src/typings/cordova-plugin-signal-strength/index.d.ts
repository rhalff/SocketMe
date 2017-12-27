interface SignalStrength {
  dbm(
    dbmCallback: (measuredDbm: number) => void): void;
}

interface Window {
  SignalStrength: SignalStrength;
}
