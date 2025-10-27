import type { Core } from "@strapi/strapi";

const AGENCY_API_URL =
  process.env.AGENCY_SYNC_URL ?? "https://api.infinitia.fr/public/drive-agencies";

type RemoteAgency = {
  id: number;
  name?: string;
  siren?: string;
  address?: string;
  postalCode?: string;
  country?: string;
  isDriveAgency?: boolean;
};

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const { log } = strapi;

    try {
      const response = await fetch(AGENCY_API_URL);

      if (!response.ok) {
        log.error(
          `Failed to sync agencies: received ${response.status} ${response.statusText} from ${AGENCY_API_URL}`
        );
        return;
      }

      const payload = (await response.json()) as unknown;

      if (!Array.isArray(payload)) {
        log.warn(
          `Expected an array of agencies from ${AGENCY_API_URL} but received ${typeof payload}`
        );
        return;
      }

      for (const record of payload as RemoteAgency[]) {
        if (!record || typeof record.id !== "number") {
          log.warn("Skipping agency entry without a numeric id", record);
          continue;
        }

        const data = {
          externalId: record.id,
          name: record.name ?? "",
          siren: record.siren,
          address: record.address,
          postalCode: record.postalCode,
          country: record.country,
          isDriveAgency: record.isDriveAgency ?? false,
        } as const;

        const existing = await strapi.db
          .query("api::agency.agency")
          .findOne({ where: { externalId: record.id } });

        if (existing) {
          await strapi.db
            .query("api::agency.agency")
            .update({ where: { id: existing.id }, data });
        } else {
          await strapi.db.query("api::agency.agency").create({ data });
        }
      }

      log.info("Agency sync completed successfully");
    } catch (error) {
      log.error("Agency sync failed", error);
    }
  },
};
