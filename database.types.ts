export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      CourseDetails: {
        Row: {
          Beratungsgespraech: boolean
          "Dauer der Kurse in Std. Intensivkurs": number | null
          "Dauer der Kurse in Wochen Langzeitkurs": number | null
          "Eigene Lernunterlagen": boolean
          Experten: boolean
          FAQ: boolean
          ID: number
          "info freien Plaetze?": boolean
          "Info zur Erfolgsquote": boolean
          "Kursart (Intensiv- oder Langzeitkurs)": string | null
          Nachholmoeglichkeiten: boolean
          "Preis pro Std. Intensivkurs": number | null
          "Preis pro Woche Langzeitkurs": number | null
          Pruefungsarchiv: boolean
          Qualitaetsbewertung: number | null
          Spezielles: string | null
          Standort: string | null
          Unterrichttag: string | null
          "Unterstuezung ausserhalb Unterrichtszeit": boolean
        }
        Insert: {
          Beratungsgespraech: boolean
          "Dauer der Kurse in Std. Intensivkurs"?: number | null
          "Dauer der Kurse in Wochen Langzeitkurs"?: number | null
          "Eigene Lernunterlagen": boolean
          Experten: boolean
          FAQ: boolean
          ID?: number
          "info freien Plaetze?": boolean
          "Info zur Erfolgsquote": boolean
          "Kursart (Intensiv- oder Langzeitkurs)"?: string | null
          Nachholmoeglichkeiten: boolean
          "Preis pro Std. Intensivkurs"?: number | null
          "Preis pro Woche Langzeitkurs"?: number | null
          Pruefungsarchiv: boolean
          Qualitaetsbewertung?: number | null
          Spezielles?: string | null
          Standort?: string | null
          Unterrichttag?: string | null
          "Unterstuezung ausserhalb Unterrichtszeit": boolean
        }
        Update: {
          Beratungsgespraech?: boolean
          "Dauer der Kurse in Std. Intensivkurs"?: number | null
          "Dauer der Kurse in Wochen Langzeitkurs"?: number | null
          "Eigene Lernunterlagen"?: boolean
          Experten?: boolean
          FAQ?: boolean
          ID?: number
          "info freien Plaetze?"?: boolean
          "Info zur Erfolgsquote"?: boolean
          "Kursart (Intensiv- oder Langzeitkurs)"?: string | null
          Nachholmoeglichkeiten?: boolean
          "Preis pro Std. Intensivkurs"?: number | null
          "Preis pro Woche Langzeitkurs"?: number | null
          Pruefungsarchiv?: boolean
          Qualitaetsbewertung?: number | null
          Spezielles?: string | null
          Standort?: string | null
          Unterrichttag?: string | null
          "Unterstuezung ausserhalb Unterrichtszeit"?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "KursDetails_ID_fkey"
            columns: ["ID"]
            isOneToOne: true
            referencedRelation: "GymiProviders"
            referencedColumns: ["ID"]
          },
        ]
      }
      GymiProviders: {
        Row: {
          Standort: string
          Aufsatzkorrektur: boolean
          Deutsch: boolean | null
          "E-Learning": boolean
          Einstufungstest: boolean
          Einzelkurse: boolean
          Franzoesisch: boolean | null
          ID: number
          "Intensiver Kurs": boolean
          Mathematik: boolean | null
          "Maximale Anzahl der Teilnehmer": string | null
          Mitarbeiter: number | null
          Name: string
          Onlinepruefung: boolean
          "Preis Intensiver Kurs": number | null
          "Preis Langzeit Kurs": number | null
          "Preis-Kategorie": string
          Pruefungssimultaion: boolean | null
        }
        Insert: {
          Aufsatzkorrektur: boolean
          Deutsch?: boolean | null
          "E-Learning": boolean
          Einstufungstest: boolean
          Einzelkurse: boolean
          Franzoesisch?: boolean | null
          ID?: number
          "Intensiver Kurs": boolean
          Mathematik?: boolean | null
          "Maximale Anzahl der Teilnehmer"?: string | null
          Mitarbeiter?: number | null
          Name?: string
          Onlinepruefung: boolean
          "Preis Intensiver Kurs"?: number | null
          "Preis Langzeit Kurs"?: number | null
          "Preis-Kategorie": string
          Pruefungssimultaion?: boolean | null
        }
        Update: {
          Aufsatzkorrektur?: boolean
          Deutsch?: boolean | null
          "E-Learning"?: boolean
          Einstufungstest?: boolean
          Einzelkurse?: boolean
          Franzoesisch?: boolean | null
          ID?: number
          "Intensiver Kurs"?: boolean
          Mathematik?: boolean | null
          "Maximale Anzahl der Teilnehmer"?: string | null
          Mitarbeiter?: number | null
          Name?: string
          Onlinepruefung?: boolean
          "Preis Intensiver Kurs"?: number | null
          "Preis Langzeit Kurs"?: number | null
          "Preis-Kategorie"?: string
          Pruefungssimultaion?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
