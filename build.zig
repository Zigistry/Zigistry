const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{
        .preferred_optimize_mode = std.builtin.OptimizeMode.ReleaseFast,
    });

    const helperFunctions = b.addModule("helperFunctions", .{
        .root_source_file = b.path("scripts/libs/functionsProvider.zig"),
        .target = target,
        .optimize = optimize,
    });

    const databaseCompiler = b.addExecutable(.{
        .name = "databaseCompiler",
        .root_source_file = b.path("scripts/databaseCompiler.zig"),
        .target = target,
        .optimize = optimize,
    });

    databaseCompiler.root_module.addImport("helperFunctions", helperFunctions);
    b.installArtifact(databaseCompiler);

    const databaseCompilerRunCmd = b.addRunArtifact(databaseCompiler);
    databaseCompilerRunCmd.step.dependOn(b.getInstallStep());

    if (b.args) |args| {
        databaseCompilerRunCmd.addArgs(args);
    }

    const databaseCompilerRunStep = b.step("databaseCompiler", "Run database compiler");
    databaseCompilerRunStep.dependOn(&databaseCompilerRunCmd.step);

    const functionsProviderUnitTests = b.addTest(.{
        .root_source_file = b.path("scripts/libs/functionsProvider.zig"),
        .target = target,
        .optimize = optimize,
    });

    const runFunctionsProviderUnitTests = b.addRunArtifact(functionsProviderUnitTests);

    const databaseCompilerUnitTests = b.addTest(.{
        .root_source_file = b.path("scripts/databaseCompiler.zig"),
        .target = target,
        .optimize = optimize,
    });

    const runDatabaseCompilerUnitTests = b.addRunArtifact(databaseCompilerUnitTests);

    const functionsProviderTestStep = b.step("testlib", "Run helperFunctions lib tests");
    const databaseCompilerTestStep = b.step("testdatabasecompiler", "Run unit tests");
    functionsProviderTestStep.dependOn(&runFunctionsProviderUnitTests.step);
    databaseCompilerTestStep.dependOn(&runDatabaseCompilerUnitTests.step);


    const repoListCompressor = b.addExecutable(.{
        .name = "repoListCompressor",
        .root_source_file = b.path("scripts/repoListCompressor.zig"),
        .target = target,
        .optimize = optimize,
    });
    repoListCompressor.root_module.addImport("helperFunctions", helperFunctions);
    b.installArtifact(repoListCompressor);
    const repoListCompressorRunCmd = b.addRunArtifact(repoListCompressor);
    repoListCompressorRunCmd.step.dependOn(b.getInstallStep());
    const repoListCompressorUnitTests = b.addTest(.{
        .root_source_file = b.path("scripts/repoListCompressor.zig"),
        .target = target,
        .optimize = optimize,
    });
    const repoListCompressorRunStep = b.step("repoListCompressor", "Run repoListCompressor");
    repoListCompressorRunStep.dependOn(&repoListCompressorRunCmd.step);
    const runRepoListCompressorUnitTests = b.addRunArtifact(repoListCompressorUnitTests);
    const runRepoListCompressorTestStep = b.step("testrunRepoListCompressor", "Run RepoListCompressor tests");
    runRepoListCompressorTestStep.dependOn(&runRepoListCompressorUnitTests.step);

}
