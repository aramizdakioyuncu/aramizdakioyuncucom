import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:flutter/material.dart';

class NotfoundView extends StatelessWidget {
  const NotfoundView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("404 - Sayfa Bulunamadı")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.error_outline, size: 100, color: Colors.red),
            const SizedBox(height: 20),
            const Text(
              "Üzgünüz, aradığınız sayfa bulunamadı!",
              style: TextStyle(fontSize: 20),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Get.offAllNamed('/'); // Ana sayfaya yönlendir
                Functions.gotoPage("/");
              },
              child: const Text("Ana Sayfaya Git"),
            ),
          ],
        ),
      ),
    );
  }
}
