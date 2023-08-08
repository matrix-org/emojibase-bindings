// swift-tools-version: 5.8
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "Emojibase",
    platforms: [
         .iOS(.v16),
     ],
    products: [
        .library(
            name: "Emojibase",
            targets: ["Emojibase"]),
    ],
    targets: [
        .target(
            name: "Emojibase",
            path: "platforms/ios/Emojibase",
            resources: [.process("Resources")]
        ),
        .testTarget(
            name: "EmojibaseTests",
            dependencies: ["Emojibase"],
            path: "platforms/ios/EmojibaseTests"
        ),
    ]
)
