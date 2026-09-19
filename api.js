class SCIEMApi {

  static async request(service, params = {}) {

    const baseUrl =
      SCIEM_CONFIG.API[service];

    if (!baseUrl) {
      throw new Error(
        `Servicio desconocido: ${service}`
      );
    }

    const url =
      new URL(baseUrl);

    Object.entries(params)
      .forEach(([key, value]) => {

        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {

          url.searchParams.set(
            key,
            value
          );

        }

      });

    const controller =
      new AbortController();

    const timer =
      setTimeout(
        () => controller.abort(),
        SCIEM_CONFIG.TIMEOUT
      );

    try {

      if (SCIEM_CONFIG.DEBUG) {
        console.log(
          `🔵 Consultando ${service}:`,
          url.toString()
        );
      }

      const response =
        await fetch(
          url.toString(),
          {
            method: "GET",
            redirect: "follow",
            cache: "no-store",
            signal: controller.signal
          }
        );

      if (!response.ok) {

        throw new Error(
          `HTTP ${response.status}`
        );

      }

      const text =
        await response.text();

      if (SCIEM_CONFIG.DEBUG) {

        console.log(
          `📦 Respuesta ${service}:`,
          text
        );

      }

      try {

        return {
          ok: true,
          type: "json",
          data: JSON.parse(text)
        };

      } catch {

        return {
          ok: true,
          type: "text",
          data: text
        };

      }

    } catch (error) {

      if (
        error.name ===
        "AbortError"
      ) {

        throw new Error(
          "Apps Script tardó demasiado en responder."
        );

      }

      throw error;

    } finally {

      clearTimeout(timer);

    }

  }


  static scriptA(params = {}) {

    return this.request(
      "SCRIPT_A",
      params
    );

  }


  static scriptB(params = {}) {

    return this.request(
      "SCRIPT_B",
      params
    );

  }

}
