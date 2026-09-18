class SCIEMApi {

  static async request(service, params = {}) {

    const baseUrl =
      SCIEM_CONFIG.API[service];

    if (!baseUrl) {
      throw new Error(
        `Servicio API desconocido: ${service}`
      );
    }

    const url = new URL(baseUrl);

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

    const timeout =
      setTimeout(
        () => controller.abort(),
        SCIEM_CONFIG.TIMEOUT
      );

    try {

      if (SCIEM_CONFIG.DEBUG) {
        console.log(
          "[SCIEM API]",
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
          `Error HTTP ${response.status}`
        );

      }

      const text =
        await response.text();

      let data;

      try {

        data =
          JSON.parse(text);

      } catch {

        console.error(
          "Respuesta recibida:",
          text
        );

        throw new Error(
          "Apps Script no devolvió JSON válido."
        );

      }

      return data;

    } catch (error) {

      if (error.name === "AbortError") {

        throw new Error(
          "La solicitud tardó demasiado."
        );

      }

      throw error;

    } finally {

      clearTimeout(timeout);

    }

  }


  static content(params = {}) {

    return this.request(
      "CONTENT",
      params
    );

  }


  static services(params = {}) {

    return this.request(
      "SERVICES",
      params
    );

  }

}
