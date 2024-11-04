import { Dispatch, SetStateAction } from "react";
import { namespace, pluginConfigKeys } from "../config";
import { SettingsView } from "@sanity/studio-secrets";

interface SecretsManagerProps {
  showSettings: boolean;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}

export default function SecretsManager({ showSettings, setShowSettings }: SecretsManagerProps) {
  return (
    <>
      {showSettings && (
        <SettingsView
          title="WebriQ Forms"
          namespace={namespace}
          keys={pluginConfigKeys}
          onClose={() => {
            setShowSettings(false);
          }}
        />
      )}
    </>
  );
}
