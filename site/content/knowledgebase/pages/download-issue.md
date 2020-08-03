---
outputs:
  - json
game: The Persistence
title: Why won't the Persistence Companion App Connect to my game?
platforms:
  - nintendo-switch
  - ps4
  - xbox-one
  - pc
  - mobile
---
The Persistence Companion app can only connect to The Persistence over a local network connection.

The mobile device being used to connect to The Persistence needs to be wirelessly connected to the same Wi-Fi router as the platform that the game is being played on. 

The Persistence app uses Multicast to find the main game. Please ensure you have Multicast enabled on both your internet router and mobile device.  Unless this is enabled, the app will not connect.

Please ensure on PC that the Windows Firewall allows any Unreal Engine traffic in and out also. The following UDP  ports need to be open:

UDP 19834

UDP 19835

UDP 19836

**Unfortunately due to compatibility issues, The Persistence Asymmetric Multiplayer Companion App is not compatible with the XBOX One platform.**