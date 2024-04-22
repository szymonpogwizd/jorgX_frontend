import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

export default function ContactDescription() {
  return (
    <FormControl sx={{ marginBottom: 2 }}>
      <Typography variant="body1" gutterBottom>
        Sekcja kontakt to miejsce, w którym użytkownicy mogą skontaktować się z administratorem aplikacji w celu zgłoszenia propozycji, błędów lub innych spraw. Zachęcamy do korzystania z tej sekcji, gdy potrzebujesz pomocy lub chcesz zgłosić uwagi dotyczące naszej aplikacji.
        Aby skontaktować się z nami, wypełnij formularz kontaktowy.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Prosimy o wpisanie w tytule emaila jednej z poniższych kategorii:
      </Typography>
      <Typography variant="body2" gutterBottom>
        - Propozycje i sugestie: Jeśli masz pomysł na nową funkcjonalność lub ulepszenie, chętnie go wysłuchamy.
      </Typography>
      <Typography variant="body2" gutterBottom>
        - Pytania: Jeśli masz jakieś pytania dotyczące naszej aplikacji, napisz do nas.
      </Typography>
      <Typography variant="body2" gutterBottom>
        - Inne: Jeśli Twoja wiadomość nie pasuje do żadnej z powyższych kategorii, wybierz tę opcję.
      </Typography>
    </FormControl>
  );
}