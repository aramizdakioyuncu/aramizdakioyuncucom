import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:flutter/material.dart';

class EventscategorylistView extends StatelessWidget {
  const EventscategorylistView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(
      context,
      body: [
        Table(
          children: [
            const TableRow(
              children: [
                TableCell(
                  child: Center(
                    child: Text("#"),
                  ),
                ),
                TableCell(
                  child: Center(
                    child: Text("Etkinlik Adı"),
                  ),
                ),
                TableCell(
                  child: Center(
                    child: Text("Katılımcı"),
                  ),
                ),
                TableCell(
                  child: Center(
                    child: Text("Yetkili"),
                  ),
                ),
                TableCell(
                  child: Center(
                    child: Text("Zaman"),
                  ),
                ),
                TableCell(
                  child: Center(
                    child: Text(""),
                  ),
                ),
              ],
            ),
            ...List.generate(
              30,
              (index) {
                return TableRow(
                  children: [
                    TableCell(
                      child: Center(
                        child: Text("#"),
                      ),
                    ),
                    TableCell(
                      child: Center(
                        child: Text("Konvoy ETkinliği"),
                      ),
                    ),
                    TableCell(
                      child: Center(
                        child: Text("20/20"),
                      ),
                    ),
                    TableCell(
                      child: Center(
                        child: Text("Berkay TİKENOĞLU"),
                      ),
                    ),
                    TableCell(
                      child: Center(
                        child: Text("10.08.2022 21.00"),
                      ),
                    ),
                    TableCell(
                      child: Center(
                        child: ARMOYU.widget.elevatedButton.costum1(
                          text: "İncele",
                          onPressed: () {},
                          loadingStatus: false,
                        ),
                      ),
                    ),
                  ],
                );
              },
            )
          ],
        ),
      ],
    );
  }
}
