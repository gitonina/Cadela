import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import  inscriptionService  from "../services/inscriptions";
import loginService from "../services/login";

const SimpleSubscribeButton = ({ raceId, categoryId }: { raceId: string; categoryId: string }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      const loggedUser = await loginService.restoreLogin();
      setUser(loggedUser);
    };
    init();
  }, []);

  const handleSubscribe = async () => {
    if (!user) {
      alert("Debes iniciar sesión para inscribirte");
      return;
    }

    const payload = {
      cyclistId: user.id,
      cyclingRaceId: raceId,
      categoryId,
    };

    await inscriptionService.createInscription(payload);
    alert("Inscripción creada con éxito");
  };

  return user ? (
    <Button variant="contained" onClick={handleSubscribe}>
      Inscribirse
    </Button>
  ) : (
    <Button variant="outlined" onClick={() => (window.location.href = "/")}>
      Inicia sesión
    </Button>
  );
};

export default SimpleSubscribeButton;