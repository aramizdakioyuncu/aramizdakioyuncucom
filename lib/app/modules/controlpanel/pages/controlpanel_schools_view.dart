import 'package:flutter/material.dart';

class ControlpanelSchoolsView extends StatelessWidget {
  const ControlpanelSchoolsView({super.key});

  @override
  Widget build(BuildContext context) {
    int? hoveredIndex; // Hover edilen satırın indeksini tutar

    return DataTable(
      headingRowColor: WidgetStateProperty.all(Colors.blue.shade200),
      columns: const [
        DataColumn(label: Text("ID")),
        DataColumn(label: Text("Ad")),
        DataColumn(label: Text("Soyad")),
      ],
      rows: List.generate(10, (index) {
        return DataRow(
          color: WidgetStateProperty.resolveWith<Color?>((states) {
            if (hoveredIndex == index) {
              return Colors.blue.shade100; // Hover efekti
            }
            return index % 2 == 0
                ? Colors.grey.shade200
                : null; // Striped satırlar
          }),
          cells: [
            DataCell(Text("${index + 1}")),
            DataCell(Text("Kullanıcı $index")),
            DataCell(Text("Soyad $index")),
          ],
          onSelectChanged: (selected) {
            // Eğer satır seçme özelliği eklemek istersen buraya koyabilirsin
          },
        );
      }),
    );
  }
}
