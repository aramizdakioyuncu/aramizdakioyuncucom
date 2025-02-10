import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:flutter/material.dart';

class CookieWidget {
  static Widget custom1() {
    return Align(
      alignment: Alignment.bottomCenter,
      child: Container(
        color: Colors.black,
        width: double.infinity,
        height: 50,
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Center(
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Wrap(
                children: [
                  const Text(
                    "Web sitemizde çerezler kullanılmaktadır. Daha fazla bilgi için Gizlilik Politikamızı inceleyebilirsiniz.",
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(width: 5),
                  ARMOYU.widget.elevatedButton.costum1(
                    background: Colors.grey.shade900,
                    text: "Tamam",
                    onPressed: () {
                      Applist.provicypolity.value = true;
                    },
                    loadingStatus: false,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
