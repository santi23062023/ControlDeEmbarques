package com.papeloapan.controldeembarques;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.PluginMethod;

import java.io.OutputStream;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

@CapacitorPlugin(name = "Printer")
public class PrinterPlugin extends Plugin {

    @PluginMethod
    public void imprimir(PluginCall call) {

        String texto = call.getString("texto", "");

        if (texto.isEmpty()) {
            call.reject("No hay texto para imprimir");
            return;
        }

        new Thread(() -> {

            try {

                Socket socket = new Socket("192.168.10.100", 9100);
                OutputStream output = socket.getOutputStream();

                output.write(new byte[]{27, 64});
                output.write(texto.getBytes(StandardCharsets.UTF_8));
                output.write(new byte[]{10, 10, 10});

                output.flush();
                output.close();
                socket.close();

                JSObject result = new JSObject();
                result.put("success", true);

                call.resolve(result);

            } catch (Exception e) {

                call.reject(
                    "No se pudo conectar con la impresora: "
                    + e.getMessage()
                );

            }

        }).start();
    }
}
