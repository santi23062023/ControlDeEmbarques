using System;
using System.Diagnostics;
using System.Net;
using System.Text;

class Program
{
    const string PrinterName = "POS-80";
    const int Port = 9101;

    static async Task Main()
    {
        Console.WriteLine("=================================");
        Console.WriteLine("   CONTROL DE EMBARQUES");
        Console.WriteLine("   PUENTE DE IMPRESION");
        Console.WriteLine("=================================");
        Console.WriteLine();
        Console.WriteLine($"Impresora: {PrinterName}");
        Console.WriteLine();
        Console.WriteLine($"Servidor iniciado en:");
        Console.WriteLine($"http://localhost:{Port}/");
        Console.WriteLine();
        Console.WriteLine("Esperando trabajos de impresion...");
        Console.WriteLine();

        if (!OperatingSystem.IsWindows())
        {
            Console.WriteLine(
                "ADVERTENCIA: la impresion funciona en Windows."
            );
        }

        var listener = new HttpListener();
        listener.Prefixes.Add($"http://localhost:{Port}/");
        listener.Start();

        while (true)
        {
            var context = await listener.GetContextAsync();

            try
            {
                if (context.Request.HttpMethod == "GET")
                {
                    await SendResponse(
                        context,
                        200,
                        "PrinterBridge OK"
                    );
                }
                else if (
                    context.Request.HttpMethod == "POST" &&
                    context.Request.Url?.AbsolutePath == "/print")
                {
                    using var reader = new StreamReader(
                        context.Request.InputStream,
                        context.Request.ContentEncoding
                    );

                    string data = await reader.ReadToEndAsync();

                    Console.WriteLine("=================================");
                    Console.WriteLine("NUEVO TRABAJO DE IMPRESION");
                    Console.WriteLine("=================================");
                    Console.WriteLine(data);
                    Console.WriteLine();

                    bool printed = PrintUsingWindows(data);

                    if (printed)
                    {
                        Console.WriteLine(
                            "IMPRESION ENVIADA CORRECTAMENTE."
                        );

                        await SendResponse(
                            context,
                            200,
                            "Impresion enviada correctamente"
                        );
                    }
                    else
                    {
                        Console.WriteLine(
                            "ERROR: no se pudo imprimir."
                        );

                        await SendResponse(
                            context,
                            500,
                            "No se pudo imprimir"
                        );
                    }
                }
                else
                {
                    await SendResponse(
                        context,
                        404,
                        "No encontrado"
                    );
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(
                    $"ERROR: {ex.Message}"
                );

                try
                {
                    await SendResponse(
                        context,
                        500,
                        $"Error: {ex.Message}"
                    );
                }
                catch
                {
                }
            }
        }
    }

    static bool PrintUsingWindows(string text)
    {
        if (!OperatingSystem.IsWindows())
        {
            return false;
        }

        try
        {
            string escapedText = text
                .Replace("\\", "\\\\")
                .Replace("\"", "\\\"")
                .Replace("\r", "")
                .Replace("\n", " ");

            string script =
                $"'{escapedText}' | Out-Printer -Name '{PrinterName}'";

            var startInfo = new ProcessStartInfo
            {
                FileName = "powershell.exe",
                Arguments = $"-NoProfile -Command \"{script}\"",
                UseShellExecute = false,
                CreateNoWindow = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true
            };

            using var process =
                Process.Start(startInfo);

            if (process == null)
            {
                Console.WriteLine(
                    "No se pudo iniciar PowerShell."
                );

                return false;
            }

            string output =
                process.StandardOutput.ReadToEnd();

            string error =
                process.StandardError.ReadToEnd();

            process.WaitForExit();

            if (process.ExitCode != 0)
            {
                Console.WriteLine(
                    $"PowerShell ERROR: {error}"
                );

                return false;
            }

            Console.WriteLine(
                "Windows envio el trabajo a POS-80."
            );

            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine(
                $"Error de impresion: {ex.Message}"
            );

            return false;
        }
    }

    static async Task SendResponse(
        HttpListenerContext context,
        int statusCode,
        string message)
    {
        byte[] response =
            Encoding.UTF8.GetBytes(message);

        context.Response.StatusCode =
            statusCode;

        context.Response.ContentType =
            "text/plain";

        context.Response.ContentLength64 =
            response.Length;

        await context.Response.OutputStream
            .WriteAsync(response);

        context.Response.OutputStream.Close();
    }
}
