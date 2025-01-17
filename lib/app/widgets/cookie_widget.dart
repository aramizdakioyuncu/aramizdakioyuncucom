import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:flutter/material.dart';

class CookieWidget {
  static Widget custom1() {
    return Align(
      alignment: Alignment.bottomCenter,
      child: Container(
        color: Colors.black,
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                "Web sitemizde çerezler kullanılmaktadır. Daha fazla bilgi için Gizlilik Politikamızı inceleyebilirsiniz.",
              ),
              ElevatedButton(
                onPressed: () {
                  Applist.provicypolity.value = true;
                },
                child: const Text("Tamam"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
