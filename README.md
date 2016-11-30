Candidate,

The purpose of this coding exercise is to briefly test your understanding of React. Note that this app is a contrived example created solely for this evaluation, and none of the code you write here will be used for any purpose other than evaluating your development abilities.

This small app is built using React, Redux, Redux-Form, and Material-UI. You are free to use anything in these packages to complete the objectives below, and you are free to pull in additional packages if you see fit.

This app replicates some of the functionality found in one of our real-world products. You can try the corresponding simulator pages on our website to get a feel for the intended functionality:

http://luxul.com/wp-content/tools/XWR-1750/settings.php
http://luxul.com/wp-content/tools/XWR-1750/profile24.php
http://luxul.com/wp-content/tools/XWR-1750/profile5G.php

(Yes, we know the UX and UI for those pages is very outdated and unintuitive. That's part of the reason we want to hire you.)

To complete the exercise, implement the following four feature requests. Feel free to e-mail me (tstokes@luxul.com) with any questions. When you're finished, send me a .tgz of the completed project. (Internally we use git, FYI, but we're not equipped to set you up with a temporary account yet).



1. Add channel width settings to the Radio Configuration interface.

The Radio Configuration panel allows for channel selection, but our users also want to set the channel width. Your job is to extend the app to support channel width selection for each radio.

For the 2.4GHz radio, the options for channel width are "20 MHz" or "20/40 MHz Auto".
For the 5GHz radio, the options for channel width are "20 MHz", "20/40 MHz Auto", or "20/40/80 MHz Auto"

But there's a catch: Not all combinations of channel widths and channel settings are valid. We need the interface to disallow invalid combinations of channel width and channels. If the user changes the settings in a way that would produce an invalid state, your interface needs to gently coerce the other settings in to a valid configuration in a way that makes sense to the user.

For the 2.4GHz Radio, all channels (1-11) are valid for both the "20 MHz" and "20/40 MHz Auto" settings. However, in "20/40 MHz Auto" mode, the user needs to choose whether the secondary 20 MHz channel is above or below the primary channel. For the ugly details, see https://en.wikipedia.org/wiki/IEEE_802.11n-2009#40.C2.A0MHz_channels_in_2.4.C2.A0GHz , but for the purposes of this exercise, this table shows valid combinations:

| Primary | Above?  | Below?  |
| ------- | ------- | ------- |
| 1       | Valid   | Invalid |
| 2       | Valid   | Invalid |
| 3       | Valid   | Invalid |
| 4       | Valid   | Invalid |
| 5       | Valid   | Valid   |
| 6       | Valid   | Valid   |
| 7       | Valid   | Valid   |
| 8       | Invalid | Valid   |
| 9       | Invalid | Valid   |
| 10      | Invalid | Valid   |
| 11      | Invalid | Valid   |


For the 5GHz Radio, the list of valid channels depends on the channel width setting. Refer to the following table for valid channels for each setting:

| Channel | 20 MHz | 20/40 MHz Auto | 20/40/80 MHz Auto |
|---------|--------|----------------|-------------------|
| 36      | Valid  | Valid          | Invalid           |
| 40      | Valid  | Valid          | Valid             |
| 44      | Valid  | Valid          | Invalid           |
| 48      | Valid  | Valid          | Invalid           |
| 149     | Valid  | Valid          | Invalid           |
| 153     | Valid  | Valid          | Valid             |
| 157     | Valid  | Valid          | Invalid           |
| 161     | Valid  | Valid          | Invalid           |
| 165     | Valid  | Invalid        | Invalid           |

For an example of how this works, see: http://luxul.com/wp-content/tools/XWR-1750/settings.php (Note: There is a bug on that page that has some valid 5GHz channels disabled in certain cases, but refer to the table above for the correct values.)



2. Disable channel controls when the radio is disabled.

When a radio is disabled, all of the channel selection and channel width fields for that radio should be disabled (grayed out). The values and fields can remain, but the used shouldn't be able to modify them.



3. Profile delete confirmation dialog.

Pressing the delete button on a profile should present a confirmation dialog to the user with a warning message and two buttons: Delete and Cancel. Pressing Delete will confirm the operation and delete the profile. Pressing Cancel will dismiss the dialog without deleting the profile.

Use the Dialog component from the Material-UI library to implement the dialog. ( http://www.material-ui.com/#/components/dialog )



4. Styling

This app is ugly, mostly because I styled it myself. You can do better, though.

The three main components (Radio Configuration, Create Profile, Profile Table) have been outlined with a simple black border for development. Your job is to put each of them inside of a Material-UI Paper component ( http://www.material-ui.com/#/components/paper ). Assign the Paper component a zDepth of 4 to give it some depth. Use your CSS skills to space the Paper components out enough that we can appreciate those nice shadows.

Next, implement a very basic responsive layout. The Radio Configuration and Create Profile components should by side-by-side and centered when space allows, but should gracefully fall back to being one on top of the other on narrow displays. See "Wide Example.png" and "Narrow Example.png" for examples of how this might look.

Don't worry too much about the exact styling details or the fact that the table columns get squished on narrow screens. We're just looking for a basic layout here.

For this task, you can use any tricks or techniques you like, although you should note that we prefer the simplest and most modern implementation when possible. Backward compatibility is not a concern, so as long as it works in Chrome, Firefox, or Edge, it works for this example.