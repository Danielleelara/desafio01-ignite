//
//  todoApp.swift
//  Shared
//
//  Created by Danielle Souza on 16/08/22.
//

import SwiftUI

@main
struct todoApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
