import { React, useState } from "react";
import { Days } from "../../main/Util";

function Hours() {
  const [alwaysOpen, setAlwaysOpen] = useState(false);
  const [days, setDays] = useState("");

  const handleAlwaysOpenTrue = () => {
    setAlwaysOpen(true);
  };

  const handleAlwaysOpenFalse = () => {
    setAlwaysOpen(false);
  };

  return (
    <div style={{ color: "#949194" }}>
      <div style={{ borderBottom: "1px solid #949194" }}>
        <header
          style={{ color: "#949194", marginBottom: "1rem", fontWeight: "bold" }}
        >
          Delivery e Retirada
        </header>
      </div>

      <div>
        <form>
          <div style={{ borderBottom: "1px solid #949194" }}>
            <div style={{ display: "flex", gap: "10px", marginTop: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #949194",
                  borderRadius: "5px",
                  padding: "0 0.6rem",
                }}
              >
                <input
                  onClick={handleAlwaysOpenFalse}
                  type="radio"
                  id="personalize"
                  name="OpenTime"
                  checked
                />
                <label style={{ marginLeft: "0.4rem", marginTop: "10px" }}>
                  Personalizar
                </label>
              </div>

              <div
                style={{
                  border: "1px solid #949194",
                  borderRadius: "5px",
                  padding: "0 0.6rem",
                }}
              >
                <input
                  onClick={handleAlwaysOpenTrue}
                  type="radio"
                  id="alwaysOpen"
                  name="OpenTime"
                />
                <label style={{ marginLeft: "0.4rem", marginTop: "10px" }}>
                  Sempre Aberto
                </label>
              </div>
            </div>
            {!alwaysOpen ? (
              <div>
                <div style={{ marginTop: "2rem" }}>
                  <div style={{ display: "flex" }}>
                    <div>
                      <div>
                        <h4>Dias da semana</h4>
                      </div>
                      <div style={{ display: "flex", marginTop: "1rem" }}>
                        <div style={{ marginRight: "1rem" }}>
                          <label>De</label>
                          <select
                            style={{
                              padding: "0.5rem 1rem",
                              marginLeft: "0.3rem",
                              borderRadius: "5px",
                              borderColor: "#949194",
                              color: "#949194",
                            }}
                            type="option"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                          >
                            {Days.map((days) => (
                              <option key={days.id} value={days.short}>
                                {days.short}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label>á</label>
                          <select
                            style={{
                              padding: "0.5rem 1rem",
                              marginLeft: "0.3rem",
                              borderRadius: "5px",
                              borderColor: "#949194",
                              color: "#949194",
                            }}
                            type="option"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                          >
                            {Days.map((days) => (
                              <option key={days.id} value={days.short}>
                                {days.short}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginLeft: "1rem" }}>
                      <div>
                        <h4>Horário</h4>
                      </div>
                      <div style={{ display: "flex", marginTop: "1rem" }}>
                        <div style={{ marginRight: "1rem" }}>
                          <label>Das</label>
                          <select
                            style={{
                              padding: "0.5rem 2rem",
                              marginLeft: "0.3rem",
                              borderRadius: "5px",
                              borderColor: "#949194",
                            }}
                          ></select>
                        </div>

                        <div>
                          <label>ás</label>
                          <select
                            style={{
                              padding: "0.5rem 2rem",
                              marginLeft: "0.3rem",
                              borderRadius: "5px",
                              borderColor: "#949194",
                            }}
                          ></select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
                  <button
                    style={{
                      width: "44.4%",
                      marginLeft: "1.55rem",
                      padding: "0.5rem 2rem",
                      color: "#949194",
                      background: "#fff",
                      borderRadius: "5px",
                      border: "1px dashed #949194",
                    }}
                  >
                    Adicionar outro Horário
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: "1.5rem", marginLeft: "1rem" }}>
                <div>
                  <h4>Horário</h4>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "1rem",
                    alignItems: "center",
                  }}
                >
                  <div style={{ marginRight: "1rem" }}>
                    <label>Das</label>
                    <select
                      style={{
                        padding: "0.5rem 1rem",
                        marginLeft: "0.3rem",
                        borderRadius: "5px",
                        borderColor: "#949194",
                        color: "#949194"
                      }}
                      type="option"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                    >
                      {Days.map((days) => (
                        <option key={days.id} value={days.short}>
                          {days.short}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label>ás</label>
                    <select
                      style={{
                        padding: "0.5rem 1rem",
                        marginLeft: "0.3rem",
                        borderRadius: "5px",
                        borderColor: "#949194",
                        color: "#949194"
                      }}
                      type="option"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                    >
                      {Days.map((days) => (
                        <option key={days.id} value={days.short}>
                          {days.short}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "0.7rem",
                      marginLeft: "1rem",
                    }}
                  >
                    <input
                      style={{
                        minWidth: "20px",
                        minHeight: "20px",
                        marginRight: "5px",
                      }}
                      type="checkbox"
                    />
                    <label>24hs</label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              style={{
                width: "30%",
                padding: "0.5rem 2rem",
                color: "#fff",
                marginTop: "1rem",
                background: "#0069D9",
                borderRadius: "5px",
                border: "none",
              }}
            >
              Salvar Configurações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Hours;
